import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { SortModalProps } from "./DropDownSort.type";
import { options } from "../../../Constants";
import { FaCheck } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DropDownSort: React.FC<SortModalProps> = ({ setSortType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSortChange = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setSortType(selectedOption);
  }, [selectedOption, setSortType]);

  return (
    <>
      <button
        className="bg-[#6968FF] flex items-center text-sm hover:bg-[#7A7AFF] text-white font-semibold px-6 py-2 rounded-2xl"
        onClick={() => setIsOpen(true)}
      >
        Сортировать <br /> сообщения
        {isOpen ? (
          <FaChevronUp className="ml-3 text-[#232323]" size={21} />
        ) : (
          <FaChevronDown className="ml-3 text-[#232323]" size={21} />
        )}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 flex justify-start items-start p-4">
                <Dialog.Panel className="mt-16 ml-64 max-w-md transform overflow-hidden rounded-2xl bg-[#232323] p-6 text-left align-middle shadow-xl transition-all">
                  <RadioGroup
                    value={selectedOption}
                    onChange={handleSortChange}
                  >
                    <div className="space-y-2">
                      {options.map((option, index) => (
                        <RadioGroup.Option
                          key={index}
                          value={option}
                          className={({ checked }) =>
                            `${
                              checked
                                ? "bg-[#6968FF] bg-opacity-100 text-white"
                                : "bg-[#565564] text-buttonTextColor"
                            }
                            relative flex cursor-pointer rounded-2xl px-5 py-4 shadow-md focus:outline-none`
                          }
                        >
                          {({ checked }) => (
                            <div className="flex w-full items-center justify-between">
                              <div className="text-sm font-medium">
                                {option}
                              </div>
                              {checked && (
                                <div className="shrink-0 text-white">
                                  {checked && (
                                    <FaCheck
                                      className="ml-3 shrink-0 text-[#232323] "
                                      size={22}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DropDownSort;