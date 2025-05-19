import { useState } from 'react';
// 사용한 이미지 모음
import CheckedIcon from '../../../assets/images/icon/ico_checked.svg?react';
import UncheckedIcon from '../../../assets/images/icon/ico_checkbox.svg?react';

const Checkbox = ({ checked,checkedMessage=null, onChange }) => {
  return (
    <label className="flex items-center justify-start cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange} // 여기서 `checked` 값을 직접 전달
        className="sr-only"
      />
      <div
        className={`w-[16px] h-[16px] border rounded-[2px] ${
          checked ? 'border-[0]' : 'border-br-gray bg-white'
        }`}
      >
        {checked && <CheckedIcon className="w-full h-full" />}
      </div>
      <span className="text-[14px] text-black font-normal ml-[4px]">{checkedMessage ? checkedMessage : null}</span>
    </label>
  );
};

export default Checkbox;