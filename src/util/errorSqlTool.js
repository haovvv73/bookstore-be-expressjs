
const getErrorSql = (errorMessage) => {
    const startIndex = errorMessage.indexOf("'") + 1;
    const endIndex = errorMessage.indexOf("'", startIndex);
    const value1 = errorMessage.substring(startIndex, endIndex);

    const secondStartIndex = errorMessage.indexOf("'", endIndex + 1) + 1;
    const secondEndIndex = errorMessage.indexOf("'", secondStartIndex);
    const value2 = errorMessage.substring(secondStartIndex, secondEndIndex);

    // value 1 error message
    // value 2 error field 
    return [value1, value2];
}

export {getErrorSql}