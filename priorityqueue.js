const ar=[];
module.exports.enqueue=(time,client)=>
{
    var today = new Date();
    var min= (today.getMinutes()<10)?"0"+today.getMinutes():today.getMinutes();
    var hrs=today.getHours();
    var current = hrs + ":" +min;
    if(time < current)
        {
                return;
        }
    else
    {
        if(ar.length==0)
        {
            ar.push({ time:time,client :client });
        }
        else 
        {
            if(ar[0].time > time)
            {    
                ar.splice(0,0,{ time:time ,client:client });
            }
            else
            {
                let i=1;
                for( ;i<ar.length;i++)
                {
                    if( ar[i].time > time )
                    {
                        ar.splice(i,0,{ time:time , client:client });
                        break;
                    }
                }
                if(i==ar.length)
                ar.splice(i,0, { time:time , client:client });
            }
        }
    }
}
module.exports.dequeue=()=>
{
           ar.shift();
}
module.exports.peek=()=>
{
    return  ar[0];
}
module.exports.isEmpty=()=>
{
    if(ar.length==0)
       return 1; 
    else
        return 0;
}