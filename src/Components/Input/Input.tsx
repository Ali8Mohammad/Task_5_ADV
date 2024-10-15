import './Input.css';

interface InputProps {
    id?: string;
    type: 'text' | 'email' | 'password' | 'file' | 'number';
    labelText?: string;
    placeholderText?: string;
    iconSrc?: string;
    imageInputClass?: string; 
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    initialValue?: string;
    previewImage?: string;
    containerClass?: string;
    largeSizeClass?: string;
    largePreviewClass?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    type,
    labelText,
    placeholderText,
    iconSrc,
    imageInputClass, 
    handleChange,
    initialValue,
    previewImage,
    containerClass,
    largeSizeClass,
    largePreviewClass
}) => {
    return (
        <div className={`input-wrapper ${containerClass}`}>
            {labelText && <label htmlFor={id}>{labelText}</label>}
            {type === 'file' ? (
                <div className={`file-input-container ${imageInputClass}`}>
                    <input
                        id={id}
                        type={type}
                        name={id}
                        accept="image/*"
                        className="file-input"
                        onChange={handleChange}
                        defaultValue={initialValue}
                    />
                    {previewImage ? (
                        <img src={previewImage} alt="Preview" className={`preview-image ${largePreviewClass}`} />
                    ) : (
                        <img src={iconSrc} alt="Upload Icon" className={`icon ${largeSizeClass}`} />
                    )}
                </div>
            ) : (
                <input
                    id={id}
                    type={type}
                    name={id}
                    placeholder={placeholderText}
                    className="text-input"
                    onChange={handleChange}
                    defaultValue={initialValue}
                />
            )}
        </div>
    );
};

export default Input;
