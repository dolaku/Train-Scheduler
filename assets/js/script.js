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
    var trainName;
    var city;
    var state;
    var frequency;
    var timeArriving;

    // At the page load and subsequent value changes, get a snapshot of the local data.
    // This function allows you to update your page in real-time when the values within the firebase node bidderData changes
    database.ref().on("value", function (snapshot) {
        data = snapshot.val();
        console.log(data);

        
    });

    // Listener on form submit
    $('#form-submit').on('click', function (event) {
        event.preventDefault();

        trainName = $('#form-train-name').val().trim();
        frequency = $('#form-frequency').val().trim();
        city = $('#form-city').val().trim();
        state = $('#form-state').val().trim();
        timeArriving = $('#form-time').val().trim();

        // Save the new train details in Firebase
        database.ref().set({
            fb_TrainName: trainName,
            fb_frequency: frequency,
            fb_city: city,
            fb_state: state,
            fb_timeArriving: timeArriving,
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