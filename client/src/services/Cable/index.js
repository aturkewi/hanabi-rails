import ActionCable from 'actioncable';

export default () => {
  const token = localStorage.token;
  const App = {};
  App.cable = ActionCable.createConsumer(`ws://localhost:3001/cable?token=${token}`);
  return App.cable
}

