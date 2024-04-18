const CompanyLogo = (props) => {
   return (
      <div className="media-left">
         <figure className="image is-128x128">
         <img src={"/" + props.symbol + ".svg"} />
         </figure>
      </div>      
   )
}

export default CompanyLogo;