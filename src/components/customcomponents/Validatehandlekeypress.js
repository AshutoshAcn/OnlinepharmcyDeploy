  export  const handleKeyPress = (e, type, maxLength) => {
    const {
      key,
      target: { value },
    } = e;
    
    if (type === 'number' && (e.key < '0' || e.key > '9') && e.key !== 'Backspace') {
      e.preventDefault();
    }

    if (value.length >= maxLength && key !== "Enter") {
      e.preventDefault();
      return;
    }

    switch (type) {
      case "text":
        if (!/^[a-zA-Z\s]$/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "number":
        if (!/[0-9]/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        else if (!/[0-9.]/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "email":
        if (!/^[a-zA-Z0-9@._+-]$/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
        case "percent":
        if (!/^[0-9.]$/.test(key) && key !== "%" && key !== "Enter") {
          e.preventDefault();
        }
          break;
      case "alphanumeric":
        if (!/^[a-zA-Z0-9_ ]$/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };