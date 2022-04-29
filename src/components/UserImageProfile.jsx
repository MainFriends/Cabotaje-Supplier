
const UserImageProfile = ({src, width, height}) => {

  return (
    <img className="rounded-circle" width={width} height={height} src={src ? src : 'https://media.istockphoto.com/vectors/businessman-avatar-profile-picture-vector-id817481514?k=20&m=817481514&s=170667a&w=0&h=CQJlAjkGFS_YKqGmv48YfFBEJzyoP8j6vePquJLCe4w='} alt="Foto del usuario"/>
  )
}

export default UserImageProfile