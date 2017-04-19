import React from 'react';
import ReactDOM from 'react-dom';
import MessageBoard from './messageBoard.js'; //名稱第一個字需大寫

ReactDOM.render(
  <MessageBoard />,                           //顯示內容
  document.getElementById('root')             //把內容放到ID=root這個HTML標籤裡
);

// const myStyle = {
//   fontSize:100,
//   color:'#FF0000',
// };
//
// class Wellcome extends React.Component {         //最外層不能同時有兩個標籤，不然會報錯
//   render(){
//     return (
//       <div>
//         <h1 style={myStyle}>Hello,World</h1>
//         <h3>{this.props.name}</h3>
//       </div>
//       );
//   }
// }
//
// ReactDOM.render(
//   <Wellcome name="Titan"/>,
//   document.getElementById('root')
// );
