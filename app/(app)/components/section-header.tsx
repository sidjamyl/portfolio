type SectionHeaderProps = {
  number: string
  label: string
}

export function SectionHeader({ number, label }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <span>
        {number} - {label}
      </span>
    </header>
  )
}
