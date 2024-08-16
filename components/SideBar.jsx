export default function SideBar (props) {
   const {  handleToggleModal, data} = props;
    return (
        <div  className="sidebar">
           
            <div className="sidebarContents"> 
            <h2 className="descriptionTitle">{data?.title}</h2> 
           <div>
            <div className="descriptionContainer">
            <p>{data?.date}</p>
            <p>{data?.explanation}</p>
        </div>
        </div>
        </div>
        </div>
    )
}