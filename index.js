const cent = document.querySelector('.cent');
let hr = document.querySelector('#hour').value;
let min = document.querySelector('#min').value;
let sec = document.querySelector('#sec').value;
let display = document.querySelector('#displayTime');
// let deleteTime = document.querySelector('#delete');
// let alarmShow = document.querySelector('.alarmShow');
let displayBox= document.querySelector('#btn');

let meridian = document.querySelector('#am_pm');
let currentTime = () => {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let ampm = hour > 12 ? 'PM' : 'AM';
    if (hour > 12) {
        hour = (hour - 12);
    }
    hour = addZero(hour);
    min = addZero(min);
    sec = addZero(sec);
    return cent.innerHTML = `${hour}:${min}:${sec} ${ampm}`;
};
function addZero(time) {
        return time < 10 ? '0' + time : time;
};

setInterval(currentTime, 1000);
 
setTime = document.querySelector('#resetBtn').onclick = () => {
    min = document.querySelector('#min').value;
    sec = document.querySelector('#sec').value;
    hr = document.querySelector('#hour').value;
    meridian = document.querySelector('#am_pm').value;
           
    if (hr != 00 || min != 00 || sec != 00) {
        const alarm=`${hr}:${min}:${sec} ${meridian}`;
               let alarmId='alarm1';
     let noOfAlarms=localStorage.length;
     if(noOfAlarms>0){
        alarmId=    `alarm${noOfAlarms+1}`;
     }
         localStorage.setItem(alarmId, alarm);
    //    console.log(localStorage.getItem(alarmId));
       setAlarmTimeBox(alarmId,alarm);
       startTimer(cent.innerHTML,alarm,alarmId)
        } else {
        alert('You are missing to fill either hrs,min or sec!, please fill left input ');
    }
 
};

    function setAlarmTimeBox(id,alarm){
        let deleteHTML=`delete-${id}`;
              let alarmBox = 
          `  <div id="display-box">
          <div class="alarmShow"  >
       <p id="displayTime">${alarm}</p>
       <p class="delete" id='${deleteHTML}'  title='Delete set alarm'>Delete</p>
     </div>
     </div>`;       
       displayBox.insertAdjacentHTML('afterend',alarmBox);

       deleteAlarmById(deleteHTML);
    //    console.log(deleteHTML);
 }
 function deleteAlarmById(id) {
    let deleteTime = document.querySelector(`#${id}`);
    // console.log("delete function",  deleteTime );
    deleteTime.addEventListener("click", function(){
        localStorage.removeItem(id);
      this.parentElement.parentElement.remove();
    //   this.parentElement.remove();
    });
} 

function startTimer(currentTime,alarm,id){
    
  let currTimeMeridian=currentTime.substring(currentTime.length-2,currentTime.length);
  let alarmTimeMeridian=alarm.substring(alarm.length-2,alarm.length);
  let currentArr=currentTime.split(':');
  console.log(currentArr);
  
  let currentSeconds=currentArr[0]*3600+currentArr[1]*60+currentArr[2].split(' ')[0]*1+(currTimeMeridian==="PM" ? 43200 :0 );
  let alarmArr=alarm.split(':');
  let alarmSeconds=alarmArr[0]*3600+alarmArr[1]*60+alarmArr[2].split(' ')[0]*1+(alarmTimeMeridian==="PM" ? 43200 :0 );
//    console.log(alarmSeconds);
   let timerSeconds=
   alarmSeconds-currentSeconds<0 ? 86400-Math.abs(alarmSeconds-currentSeconds):alarmSeconds-currentSeconds ;
    // console.log(timerSeconds);
 
    setTimeout(()=>{
        console.log(`${id}`);
        alert(`${id} is ringing now`);
        let deleteHTML=`delete-${id}`;
       let deleteTime=document.querySelector(`#${deleteHTML}`);
    //    console.log(deleteTime);
       localStorage.removeItem(id);
       deleteTime.parentElement.parentElement.remove();    

        

    },timerSeconds*1000)


}


  


             







