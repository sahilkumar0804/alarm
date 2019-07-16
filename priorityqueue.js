const ar=[];
module.export.enqueue=(time,client)=>
{
    
    if(ar.length==0)
    {
         ar.push({ time:time,client :client });
    }
    else 
    {
        if(ar[0].time > time)
        {    
             ar.splice(0,1,{ time:time ,client:client });
        }
        else
        {
            let i=1;
            for(;i<ar.length;i++)
            {
                if( ar[i].time > time )
                {
                    ar.splice(i,0,{ time:time , client:client });
                      return;
                }
            }
            ar.splice(i,0, { time:time , client:client });
        }
    }
}
module.export.dequeue=()=>
{
        if(ar.length !=0)
           ar.splice(0,2);
}
module.export.peek=()=>
{
    return  ar[0];
}
module.exports.isEmpty()
{
    if(ar.length==0)
       return 1; 
    else
        return 0;
}