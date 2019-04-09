$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAG-A-dpwB76dWXBPtiWGjUZZhsBaVvtyg",
        authDomain: "train-scheduler-1e659.firebaseapp.com",
        databaseURL: "https://train-scheduler-1e659.firebaseio.com",
        projectId: "train-scheduler-1e659",
        storageBucket: "train-scheduler-1e659.appspot.com",
        messagingSenderId: "716947237875"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var data;
    var trainCount = 0;
    var trainName;
    var city;
    var state;
    var frequency;
    var timeArriving;

    // At the page load and subsequent value changes, get a snapshot of the local data.
    // This function allows you to update your page in real-time when the values within the firebase node bidderData changes
    
    for (var i = 0; i <= 10; i++) {
        database.ref('/trainData' + i).on("value", function (snapshot) {
            data = snapshot.val();
            console.log(data);
    
            // if (
            //     snapshot.child("trainName").exists() 
            //     && snapshot.child("city").exists()
            //     && snapshot.child("state").exists()
            //     && snapshot.child("frequency").exists()
            //     && snapshot.child("timeArriving").exists()
            //     ) {
                    $('#table-schedule').append(`
                        <tr>
                            <th scope="row">${data.trainName}</th>
                            <td>${data.city}, ${data.state}</td>
                            <td>${data.frequency}</td>
                            <td>${data.timeArriving}</td>
                            <td>??? mins away</td>
                        </tr>
                    `)
            // }

        });
    }

    // Listener on form submit
    $('#form-submit').on('click', function (event) {
        event.preventDefault();

        trainCount++;

        trainName = $('#form-train-name').val().trim();
        frequency = $('#form-frequency').val().trim();
        city = $('#form-city').val().trim();
        state = $('#form-state').val().trim();
        timeArriving = $('#form-time').val().trim();

        // Save the new train details in Firebase
        database.ref('/trainData' + trainCount).set({
            trainCount: trainCount,
            trainName: trainName,
            frequency: frequency,
            city: city,
            state: state,
            timeArriving: timeArriving,
        });

        $('#table-schedule').append(`
        <tr>
            <th scope="row">${trainName}</th>
            <td>${city}, ${state}</td>
            <td>${frequency}</td>
            <td>${timeArriving}</td>
            <td>??? mins away</td>
        </tr>
    `)

    });














});