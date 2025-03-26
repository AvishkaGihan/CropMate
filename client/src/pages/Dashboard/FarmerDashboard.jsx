import React from 'react'

import { DataTable, StatusBadge } from '../../components/Dashboard/DataTable';
import { Edit, Trash, Eye } from 'lucide-react';
import FormComponentsExample from './FormComponentsExample';

const MyDataTablePage = () => {
    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Name', sortable: true },
        {
            field: 'status', header: 'Status', sortable: true,
            render: (row) => <StatusBadge status={row.status} />
        },
        {
            field: 'createdAt', header: 'Created Date', sortable: true,
            render: (row) => new Date(row.createdAt).toLocaleDateString()
        },
    ];

    const data = [
        { id: 1, name: 'Rice', status: 'success', createdAt: '2023-01-15' },
        { id: 2, name: 'Wheat', status: 'pending', createdAt: '2023-02-20' },
        { id: 3, name: 'Corn', status: 'error', createdAt: '2023-03-10' }
    ];

    const rowActions = [
        {
            label: 'View',
            icon: <Eye size={16} />,
            onClick: (row) => console.log('View', row)
        },
        {
            label: 'Edit',
            icon: <Edit size={16} />,
            onClick: (row) => console.log('Edit', row)
        },
        {
            label: 'Delete',
            icon: <Trash size={16} />,
            onClick: (row) => console.log('Delete', row)
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <DataTable
                columns={columns}
                data={data}
                rowActions={rowActions}
                onRowClick={(row) => console.log('Row clicked:', row)}
                onRowSelectionChange={(selectedIds) => console.log('Selected:', selectedIds)}
            />
        </div>
    );
};

const FarmerDashboard = () => {
    return (
        <div>
            <MyDataTablePage />
            <FormComponentsExample />
        </div>
    )
}

export default FarmerDashboard;