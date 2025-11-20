export default function highlightText(text, query) {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-white rounded px-1 shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-pulse"
      >
        {part}
      </mark>
    ) : (
      part
    )
  )
}
