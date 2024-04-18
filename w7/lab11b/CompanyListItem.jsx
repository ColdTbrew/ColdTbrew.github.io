import editIcon from '../assets/pencil.svg';

const CompanyListItem = (props) => {


   return (
      <li className="p-3 flex justify-between items-center user-card">
		 <div className="flex items-center">
			<span className="ml-3 font-medium"></span>
		 </div>
		 <div>
			<button className="text-gray-500 hover:text-gray-700"  >
			   <img src={editIcon}  className="w-5" />
			</button>
		 </div>
      </li>
   )
}

export default CompanyListItem;