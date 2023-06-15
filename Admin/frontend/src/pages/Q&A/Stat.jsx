import React, { useEffect, useState } from 'react';
import { Chart, Series, CommonSeriesSettings, Title, Legend, ArgumentAxis, ValueAxis, Export } from 'devextreme-react/chart';
import axios from 'axios';
import Niv from '../../components/Niv';
import Notification from "../../components/Notification";

const MessageChart = () => {
  const [messageData, setMessageData] = useState([]);
  const currentUser = '644df7666512eabcfd11aa19'

  useEffect(() => {
    fetchMessageData();
  });

  const fetchMessageData = () => {
    // Make an API request to fetch the message data for the current user
    axios.get('http://localhost:8070/chat/admin', {
      params: {
        receiver: currentUser
      }
    })
      .then((response) => {
        const messages = response.data;
        const messageCountPerDay = generateMessageCountPerDay(messages);
        setMessageData(messageCountPerDay);
      })
      .catch((error) => {
        console.error('Failed to fetch message data:', error);
      });
  };

  const generateMessageCountPerDay = (messages) => {
    // Process the messages data and calculate the count of messages received on each day
    const messageCountPerDay = messages.reduce((countPerDay, message) => {
      const messageDate = new Date(message.createdAt).toLocaleDateString();
      countPerDay[messageDate] = (countPerDay[messageDate] || 0) + 1;
      return countPerDay;
    }, {});

    // Format the data for the bar chart
    const data = Object.entries(messageCountPerDay).map(([date, count]) => ({
      date,
      count,
    }));

    return data;
  };

  return (
    <div>
      <Niv name='Customer Support' />
      <Notification />

      <div className='data'>
        <Chart dataSource={messageData}>
          <Title text="Number of Messages Received per Day" />
          <CommonSeriesSettings argumentField="date" type="bar" />
          <Series valueField="count" name="Messages" />
          <ArgumentAxis>
            <Title text="Date" />
          </ArgumentAxis>
          <ValueAxis>
            <Title text="Message Count" />
          </ValueAxis>
          <Legend visible={false} />
          <Export enabled={true} />
        </Chart>
      </div>
    </div>

  );
};

export default MessageChart;
