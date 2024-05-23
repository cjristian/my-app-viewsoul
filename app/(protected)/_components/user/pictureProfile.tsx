
export default function pictureProfile(id:string) {
  return (
    <div className="pictureProfile">
        <img src={require(`../assets/images/${id}.jpg`)} alt="profile" />
        
    </div>
    
  )
}
