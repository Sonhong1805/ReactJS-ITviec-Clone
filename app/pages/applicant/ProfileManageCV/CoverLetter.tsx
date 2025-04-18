import { useState } from "react";
import { CoverLetterWrapper } from "./styled";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "feather-icons-react";

const CoverLetter = () => {
  const [showArea, setShowArea] = useState(false);

  const schema = z.object({
    letter: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<{ letter: string }>({
    defaultValues: {
      letter: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<{ letter: string }> = async (data: {
    letter: string;
  }) => {
    console.log(data);
  };

  const isValidLetter = watch("letter") !== "" ? "success" : "";

  return (
    <CoverLetterWrapper>
      <div style={{ position: "relative" }}>
        <h2>Cover Letter</h2>
        {showArea ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <hr />
            <p className="tips">
              Tips: Start by describing what you bring to the table and why this
              job excites you
            </p>
            <textarea
              id="letter"
              {...register("letter")}
              maxLength={500}
              className={isValidLetter}></textarea>
            <span className="characters">
              {500 - Number(watch("letter")?.length)}/500 characters
            </span>
            <div className="group-button">
              <button className="cancel" onClick={() => setShowArea(false)}>
                Cancel
              </button>
              <button type="submit" className="save">
                Save
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>Introduce yourself and why you'd make a great hire</p>
            <img
              src={"/assets/svg/cover_letter_no_info.svg"}
              alt="uploaded resume"
            />
            <Edit cursor={"pointer"} onClick={() => setShowArea(true)} />
          </div>
        )}
      </div>
    </CoverLetterWrapper>
  );
};

export default CoverLetter;
