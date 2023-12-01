import { useFormik } from "formik";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const DonationCampaign = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const email = user.email
    const currentDate = new Date();
    const date = currentDate.toISOString();
    const [selectedDate, setSelectedDate] = useState(null);
    // console.log(date)
    // Formik initialization
    // console.log(selectedDate)

    const handleDateChange = (date) => {
        console.log('Selected Date:', date);
        setSelectedDate(date);
        formik.setFieldValue('addedDate', date);
    };

    const formik = useFormik({
        initialValues: {
            maxDonationAmount: '',
            shortDescription: '',
            longDescription: '',
            donationImage: null,
            addedDate: new Date(),
        },
        validationSchema: Yup.object({
            maxDonationAmount: Yup.number().positive('Amount must be a positive number').required('This Field is required'),
            shortDescription: Yup.string().required('Short Description is required'),
            longDescription: Yup.string().required('Long Description is required'),
            donationImage: Yup.mixed().required('Donation image is required'),
            addedDate: Yup.date().required('Date is required'),
        }),

        onSubmit: async (values) => {
            // Here you can send the data to your MongoDB server or API
            console.log('Form data submitted:', values);


            // Example: send data to MongoDB
            // axios.post('/api/addPet', values)
            // image upload to imgbb and then get an url

            console.log(values)
            const imageFile = { image: values.donationImage }
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                // now send the menu item data to the server with the image url
                const donationItem = {
                    maxDonationAmount: parseFloat(values.maxDonationAmount),
                    shortDescription: values.shortDescription,
                    longDescription: values.longDescription,
                    donationCreateDate: date,
                    donationLastDate:selectedDate,
                    email: email,
                    image: res.data.data.display_url,
                };

                const donationRes = await axiosSecure.post('/donation', donationItem);
                console.log(donationRes.data)
                if (donationRes.data.insertedId) {
                    // show success popup

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Your Campaign is added .`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
            console.log('with image url', res.data);
        },
    });

    return (
        <div>
            <SectionTitle heading="Add A Donation Campaign" subHeading="Make The world Beautiful"></SectionTitle>
            <form onSubmit={formik.handleSubmit}>
                {/* Donation Maximum Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="maxDonationAmount"><span className="label-text">Maximum Donation Amount*</span></label>
                    <input
                        type="number"
                        placeholder="Enter Maximum Donation Amount"
                        id="maxDonationAmount"
                        name="maxDonationAmount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxDonationAmount}
                        className="input input-bordered w-full"
                    />
                    {formik.touched.maxDonationAmount && formik.errors.maxDonationAmount ? (
                        <div>{formik.errors.maxDonationAmount}</div>
                    ) : null}
                </div>

                {/* Last Date */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="addedDate"><span className="label-text">Date*</span></label>
                    <DatePicker
                        id="addedDate"
                        name="addedDate"
                        selected={formik.values.addedDate}
                        onChange={handleDateChange}
                        className="input input-bordered w-full"
                    />

                    {formik.touched.addedDate && formik.errors.addedDate ? (
                        <div>{formik.errors.addedDate}</div>
                    ) : null}
                </div>


                {/* short Description Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="shortDescription"><span className="label-text">Short Description*</span></label>
                    <textarea
                        type="text"
                        placeholder="Short Description"
                        id="shortDescription"
                        name="shortDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.shortDescription}
                        className="input textarea input-bordered w-full"
                    />
                    {formik.touched.shortDescription && formik.errors.shortDescription ? (
                        <div>{formik.errors.shortDescription}</div>
                    ) : null}
                </div>
                {/* Long Description Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="longDescription"><span className="label-text">Long Description*</span></label>
                    <textarea
                        placeholder="Long Description"
                        id="longDescription"
                        name="longDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.longDescription}
                        className="input textarea input-bordered w-full"
                    />
                    {formik.touched.longDescription && formik.errors.longDescription ? (
                        <div>{formik.errors.longDescription}</div>
                    ) : null}
                </div>

                {/* Image Upload Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="donationImage"><span className="label-text">Donation Image*</span></label>
                    <input
                        type="file"
                        id="donationImage"
                        name="donationImage"
                        onChange={(event) => formik.setFieldValue('donationImage', event.currentTarget.files[0])}
                        onBlur={formik.handleBlur}
                        className=" w-full file-input max-w-xs"
                    />
                    {formik.touched.donationImage && formik.errors.donationImage ? (
                        <div>{formik.errors.donationImage}</div>
                    ) : null}
                </div>



                {/* Submit Button */}
                <button className='btn bg-[#f04336] hover:bg-[#f04336] w-full text-white' type="submit">Add Pet</button>
            </form>
        </div>
    );
};

export default DonationCampaign;