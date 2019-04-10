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

    // At the page load and value changes, get a snapshot of the local data.
    // Create Firebase event for adding a train to the database
    database.ref().on("child_added", function (snapshot) {
        var data = snapshot.val();
        console.log(data);

        var currentTime = moment().format("HH:mm");
        var firstTimeConverted = moment(data.firstArrival, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        console.log('first train: ' + data.firstArrival)
        console.log('freq: ' + data.frequency)
        console.log("now = " + currentTime);
        console.log("difference = " + diffTime);
        // Time apart (remainder)
        var tRemainder = diffTime % data.frequency;

        // Minute Until Train
        var tMinutesTillTrain = data.frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
        console.log("ARRIVAL TIME: " + nextTrain);


        // add a new table row
        $('#table-schedule').append(`
            <tr>
                <th scope="row">${data.trainName}</th>
                <td>${data.city}, ${data.state}</td>
                <td>${data.frequency}</td>
                <td>${nextTrain}</td>
                <td>${tMinutesTillTrain} mins away</td>
            </tr>
        `)
    });

    // Listener on form submit
    $('#form-submit').on('click', function (event) {
        // stops page from refreshing
        event.preventDefault();

        var trainName = $('#form-train-name').val().trim();
        var frequency = $('#form-frequency').val().trim();
        var city = $('#form-city').val().trim();
        var state = $('#form-state').val().trim();
        var firstArrival = $('#form-time').val().trim();

        // Save the new train details in Firebase
        database.ref().push({
            trainName,
            frequency,
            city,
            state,
            firstArrival,
        });

        // clear all input fields
        $('#form-train-name').val('');
        $('#form-frequency').val('');
        $('#form-city').val('');
        $('#form-state').val('');
        $('#form-time').val('');

    });














});