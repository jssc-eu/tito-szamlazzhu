
const getSeller = (event) => {
  const { email, bank } = event;

  return { // everyting is optional
    bank,
    email,
  };
};

export default getSeller;
