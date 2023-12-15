import { useInput } from "../hooks/use-input";

const validateName = (name) => name.trim() !== "";
const validateEmail = (email) => email.trim() !== "" && email.includes("@");

const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    enteredValueIsValid: enteredNameIsValid,
    valueInputIsInvalid: nameInputIsInvalid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    initState: nameInitState,
  } = useInput(validateName);

  const {
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    valueInputIsInvalid: emailInputIsInvalid,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    initState: emailInitState,
  } = useInput(validateEmail);

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    console.log(enteredName);
    console.log(enteredEmail);

    nameInitState();
    emailInitState();
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email should not be empty and contain @.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
