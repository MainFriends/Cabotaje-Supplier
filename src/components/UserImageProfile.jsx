
const UserImageProfile = ({src ='../src/assets/img/undraw_profile.svg', width, height}) => {

  return (
    <img className="rounded-circle" width={width} height={height} src={src} alt="Foto del usuario"/>
  )
}

export default UserImageProfile