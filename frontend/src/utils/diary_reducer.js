/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
export default function diaryReducer(preState="",action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {data} = action
	return data;
}