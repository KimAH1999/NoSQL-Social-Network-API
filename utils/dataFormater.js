//Data Formater section 
const AddDateSuffix = date => {
    let dateString = date.toString();

    const lastCharacter = dateString.charAt(dateString.length - 1);

    //1
    if(lastCharacter === '1' && dateString != '11'){
        dateString = `${dateString}st`;
    //2
    }else if(lastCharacter === '2' && dateString != '12'){
        dateString = `${dateString}nd`;
    //3
    }else if(lastCharacter === '3' && dateString != '13'){
        dateString = `${dateString}rd`;
    //4,5,6,and etc
    }else{
        dateString = `${dateString}th`;
    }
    return dateString   
}

//export function that takes timestamp
module.exports = ( timestamp, {monthLength = 'short', dateSuffix = true} = {}) => {
    let months; 

    //short month version of months
    if(monthLength === 'short'){
        months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
          };
    }else{
        //If NOT, show long version
        months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
          };
    }
    // Timestamp function format string
    const dateObject = new Date(timestamp);
    const formattedMonth = months[dateObject.GetMonth()];

    let dayOfMonth;

    if(dateSuffix){
        dayOfMonth = AddDateSuffix(dateObject.GetDate());
    }else{
        dayOfMonth = dateObject.GetDate();
    }

    const year = dateObject.GetFullYear();

    let hour;

    if(dateObject.GetHours > 12){
        hour = Math.floor(dateObject.GetHours() / 2);
    }else{
        hour = dateObject.GetHours();
    }

    if(hour === 0){
        hour = 12;
    }

    const minutes = dateObject.GetMinutes();


    //AM OR PM function
    let periodOfDay; 

    if(dateObject.GetHours() >= 12){
        periodOfDay = 'pm';
    }else{
        periodOfDay = 'am'
    }
    //Formater MMMM/DD/YYYY AT HH:MM (AM OR PM)
    const formattedTime = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}: ${minutes} ${periodOfDay}`

    return formattedTime;
}