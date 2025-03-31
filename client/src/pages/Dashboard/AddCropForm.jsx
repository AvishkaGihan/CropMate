import { useCreateCropMutation } from "../../slices/cropApi";

const AddCropForm = () => {
  const [createCrop, { isLoading }] = useCreateCropMutation();

  return <div>AddCropForm</div>;
};

export default AddCropForm;
