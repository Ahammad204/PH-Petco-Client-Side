/* eslint-disable react/prop-types */




const PetCategory = ({ category }) => {

    const {  photo, name } = category || {}

    return (
        <div>


            {/* Brands */}
            <div className="card bg-base-100 shadow-xl">
                <figure className="flex-grow">
                    <img src={photo} alt={name} className="rounded-xl w-full h-60" />
                </figure>
                <div className="card-body items-center text-center ">
                    <h2 className="card-title font-extrabold text-3xl">{name}</h2>

                </div>
             
            </div>


        </div>
    );
};

export default PetCategory;