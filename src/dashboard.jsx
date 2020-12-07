// my-dashboard-component.jsx
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { ApiClient } from 'admin-bro';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@admin-bro/design-system';

const api = new ApiClient();

export default function Dashboard() {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    api.getDashboard()
      .then((res) => {
        setData(res.data);
        console.log(data);
      });
  }, []);

  return (
    <Box variant="grey">
      <Box variant="white">
        {data.sky}
        {console.log(data)}
      </Box>
    </Box>
  );
}
