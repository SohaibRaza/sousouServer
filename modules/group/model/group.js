const mongoose = require("mongoose")
const Users = require('../../users/model/users');
const Schema = mongoose.Schema


const paypalPaymentInfo = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'Users' },
    paymentJSON: {
        type: Object,
        required: true
    }
})

const paymentStatusSchema = new Schema({
    cycle_number: {
        type: Number,
        required: true
    },
    payment_arrived: {
        type: [Schema.Types.ObjectId], ref: 'Users', default: []
    },
    total_arrived_payment: {
        type: Number,
        required: true
    },
    paid_members:
    {
        type: [Schema.Types.ObjectId],
        ref: 'Users',
        default: []
    },
    unpaid_members: {
        type: [Schema.Types.ObjectId],
        ref: 'Users',
    },
    enqueued_member_payments:{
        type: [Schema.Types.ObjectId],
        ref: 'Users',
        default: []
    },
    current_status: {
        type: String, //Pending / Completed / OnGoing
        required: true,
        default: 'PENDING',
    },
    payment_info: {
        type: [paypalPaymentInfo],
        default: []
    }
});

const group = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },

    members: [
        { type: Schema.Types.ObjectId, ref: 'Users' }
    ],
    created_by: {
        type: String,
        required: true
    },
    duration: {//1 year
        type: String,
        trim: true
    },
    target_amount: {//$1200 in total
        type: String,
        trim: true
    },
    payment_frequency: { //$100 per month
        type: String,
        trim: true
    },
    payment_cycle: { //each month
        type: String,
        trim: true
    },
    members_limit: {
        type: Number,
        require: true,
        min: 2
    },
    cycle_status: {
        type: [paymentStatusSchema],
        default: []
    }
})

module.exports = mongoose.model("Group", group);
