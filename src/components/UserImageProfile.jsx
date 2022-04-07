
const UserImageProfile = ({src, width, height}) => {

  return (
    <img className="rounded-circle" width={width} height={height} src={src} alt="Foto del usuario"/>
  )
}

export default UserImageProfile