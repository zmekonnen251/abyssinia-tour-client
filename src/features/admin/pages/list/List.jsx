import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../../../layouts/Header/Header';

import Datatable from '../../components/datatable/Datatable';

const List = () => {
	return (
		<>
			<Header />

			<div className='list'>
				<Sidebar />
				<div className='listContainer'>
					<Datatable />
				</div>
			</div>
		</>
	);
};

export default List;
