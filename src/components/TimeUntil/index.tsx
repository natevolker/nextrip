import { useEffect, useState } from "react"

export const TimeUntil: React.FC<{ timestamp?: number }> = ({ children, ...props }) => {
  const [text, setText] = useState(children)
  const [now, setNow] = useState(Date.now())

  const timestamp = props.timestamp && props.timestamp < 2000000000
    ? props.timestamp * 1000 // timestamp was in seconds, not ms
    : props.timestamp

  const dateTime = timestamp
    ? new Date(timestamp).toUTCString()
    : ''

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (typeof timestamp !== 'undefined') {
      // due in the next minue
      if (timestamp < now + (60 * 1000)) {
        setText('Due')
      }

      // due in the next 10 minues
      else if (timestamp < now + (60 * 1000 * 10)) {
        const rtf = new Intl.RelativeTimeFormat("en", {
          localeMatcher: "best fit",
          numeric: "always",
          style: "long",
        })
        setText(rtf.format(Math.round((timestamp - now) / 60 / 1000), 'minute'))
      }

      // due in more than 10 minutes
      else {
        const parts = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).formatToParts(timestamp)
        setText(parts.filter(part => part.type !== 'dayPeriod').map(part => part.value).join('').trim())
      }
    }
  }, [timestamp, now])

  return <time dateTime={dateTime} data-timestamp={timestamp}>{text}</time>
}