import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

type DataTableProps = {
	rows: any;
	columns: any;
	onDelete?: any;
	onView?: any;
	onUpdate?: any;
	name?: string;
};

const Datatable = ({
	name,
	rows,
	columns,
	onDelete,
	onView,
	onUpdate,
}: DataTableProps) => {
	const actionColumn = [
		{
			field: 'action',
			headerName: 'Action',
			width: 300,
			renderCell: (params: any) => {
				return (
					<div className='cellAction cell'>
						<Link
							to={`/dashboard/${name}/${params.row._id}`}
							style={{ textDecoration: 'none' }}
						>
							<Button
								variant='contained'
								color='primary'
								startIcon={<VisibilityIcon />}
							/>
						</Link>
						<Button
							variant='contained'
							color='error'
							startIcon={<DeleteIcon />}
							onClick={() => onDelete(params?.row?._id)}
						/>
						<Button
							variant='contained'
							color='warning'
							startIcon={<EditIcon />}
							onClick={() => onUpdate(params?.row?._id)}
						/>
					</div>
				);
			},
		},
	];
	return (
		<div className='datatable'>
			<div className='datatableTitle' style={{ textTransform: 'capitalize' }}>
				{name}
				<Link to={`/dashboard/${name}/new`} className='link'>
					Add New
				</Link>
			</div>
			<DataGrid
				className='datagrid'
				rows={rows}
				columns={columns.concat(actionColumn)}
				pageSize={9}
				// sortingMode='client'
				// sortModel={[{ field: 'modifiedAt', sort: 'desc' }]}
				rowsPerPageOptions={[9]}
				checkboxSelection
				sx={{ width: '100%', padding: '0 ' }}
			/>
		</div>
	);
};

export default Datatable;
