import React from 'react';

const Table = ({ headers, data, renderRow }) => {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="py-3 px-4 text-left text-sm text-gray-500">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => renderRow(item, index))}
            </tbody>
        </table>
    );
};

export default Table;