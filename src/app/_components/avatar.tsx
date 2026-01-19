type Props = {
  name?: string | null
  src?: string | null
}

const Avatar = ({ name, src }: Props) => {
  return (
    <div className="flex items-center">
      {src && (
        <img
          src={src}
          className="w-12 h-12 rounded-full mr-4"
          alt={name ?? ""}
        />
      )}
      {name && <div className="text-xl font-bold">{name}</div>}
    </div>
  )
}

export default Avatar
