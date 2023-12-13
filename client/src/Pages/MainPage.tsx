import { NicknameForm } from "../Components/UI/NicknameForm";

const MainPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-1 items-center justify-center p-4">
        <div>
          <div className="flex justify-center text-[#605FFF] items-center mb-9 text-4xl font-bold">
            Добро пожаловать в чат!
          </div>
          <NicknameForm />
        </div>
      </div>
      <div className="hidden md:flex flex-1 relative">
        <img
          src="/iPhone.jpg"
          alt="iPhone"
          className="absolute opacity-80 inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MainPage;
