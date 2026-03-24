export const generatePassword = (fullName = '', dob = '') => {
  if (!fullName || !dob) return 'DefaultPass@123'
  
  const nameChars = fullName.toUpperCase().replace(/\s/g, '').substring(0, 4)
  const dobNumbers = dob.replace(/[^0-9]/g, '').substring(4, 8)
  
  if (!nameChars || !dobNumbers) return 'DefaultPass@123'
  
  return `${nameChars}${dobNumbers}@temp`
}
