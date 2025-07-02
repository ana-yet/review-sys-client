const ServiceTable = ({ services }) => {
  return (
    <div className="overflow-x-auto rounded-md shadow mt-6">
      <table className="min-w-full divide-y divide-gray-200 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-gray-700">
              Title
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-700">
              Company
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-700">
              Price
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-700">
              Rating
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service._id}>
              <td className="px-6 py-4">{service.serviceTitle}</td>
              <td className="px-6 py-4">{service.companyName}</td>
              <td className="px-6 py-4">${service.price}</td>
              <td className="px-6 py-4">{service.rating} ⭐</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
