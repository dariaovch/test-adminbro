// my-dashboard-component.jsx
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { ApiClient } from 'admin-bro';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Label, Box } from '@admin-bro/design-system';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';

const api = new ApiClient();

// Создаем компонент для Дашборда, получаем в него данные ресурса "Погода" и строим график

export default function Dashboard() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    api.resourceAction({ resourceId: 'weather', actionName: 'list' })
      .then((results) => {
        const { records } = results.data;
        setData(records);
      });
  }, []);

  const chartData = data.map((item) => ({ name: <item className="params id"></item>, temp: item.params.temperature }));

  return (
    <Box variant='grey'>
      <Label>Temperature changes</Label>
      <Box variant='white'>
        <LineChart width={400} height={400} data={chartData}>
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
      </Box>
    </Box>
  );
}
