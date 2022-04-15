
const UserImageProfile = ({src, width, height}) => {

  return (
    <img className="rounded-circle" width={width} height={height} src={src ? src : '../src/assets/img/undraw_profile.svg'} alt="Foto del usuario"/>
  )
}

export default UserImageProfile