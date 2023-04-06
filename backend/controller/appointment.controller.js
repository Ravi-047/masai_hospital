const Appointment = require("../model/appointment.model");


const getAppointment = async (req, res) => {
    const { specialization, doctor, date } = req.query;
    const queryObject = {};
    console.log(specialization, doctor);
    if (specialization) queryObject.specialization = specialization;
    if (doctor) queryObject.name = { $regex: doctor, $options: "i" }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 4;
    let skip = (page - 1) * limit;

    let data = Appointment.find(queryObject).skip(skip).limit(limit);
    const appointment_data = await data;
    res.status(200).json({ appointment_data, page: page, Total: appointment_data.length })
}


const createAppointment = async (req, res) => {
    const newAppointment = req.body;
    try {
        const addAppointment = new Appointment(newAppointment);
        await addAppointment.save();
        res.send("Appointment created successfully")
    } catch (error) {
        console.log("Cannot Create Appointment");
        res.send(error);
    }
}


module.exports = { createAppointment, getAppointment }