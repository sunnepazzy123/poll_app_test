
const form = document.getElementById('vote-form');


form.addEventListener("submit", e =>{
    const choice = document.querySelector("input[name=smartphone]:checked").value;
    const data = {smartphone: choice};

    fetch("http://localhost:4000/poll", {
        method: "post",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
    .then(res=> res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

    e.preventDefault();

});

fetch("http://localhost:4000/poll")
    .then(res=> res.json())
    .then(data=> {
        console.log(data);
        const votes = data.votes;
        const totalVotes = votes.length;

        //count vote points
        const voteCounts = votes.reduce(
            (acc, vote ) => (
                ( acc[vote.smartphone] = (acc[vote.smartphone] || 0) + parseInt(vote.points) ), acc),
                {}

            
        );



        let dataPoints = [
            {label: "Iphone", y:voteCounts.Iphone},
            {label: "Htc", y:voteCounts.Htc},
            {label: "Nokia", y:voteCounts.Nokia},
            {label: "Samsung", y:voteCounts.Samsung},
            {label: "Other", y:voteCounts.Other}
        ];
        
        const chartContainer = document.querySelector("#chartContainer");
        
        if(chartContainer){
            const chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: `Total Votes ${totalVotes}`
                },
                data: [
                    {
                        type: "column",
                        dataPoints: dataPoints
                    }
                ]
            });
        
            chart.render();
        
            
            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;
        
            var pusher = new Pusher('8094042d1c4c607cfccd', {
              cluster: 'eu',
              forceTLS: true
            });
        
            var channel = pusher.subscribe('smartphone');
            channel.bind('smartphone-vote', function(data) {
            //   alert(JSON.stringify(data));
                dataPoints = dataPoints.map(x=>{
                    if(x.label == data.smartphone){
                        x.y += data.points;
                        return x;
                    }else{
                        return x;
                    }
                });
                chart.render();
            });
        
        
        }
        
    })



