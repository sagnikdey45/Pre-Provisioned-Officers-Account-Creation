import { generatePassword } from './generatePassword'

export const validateOfficerData = (data = []) => {
  const validOfficers = []
  const errors = []
  const warnings = []

  data.forEach((row, index) => {
    const rowNumber = index + 1
    let isValid = true

    const requiredFields = {
      fullName: row.fullName?.trim?.(),
      email: row.email?.trim?.(),
      dob: row.dob?.trim?.(),
      phone: row.phone?.trim?.(),
      state: row.state?.trim?.(),
      city: row.city?.trim?.(),
      region: row.region?.trim?.(),
      district: row.district?.trim?.(),
      department: row.department?.trim?.(),
      role: row.role?.trim?.()
    }

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        errors.push(`Row ${rowNumber}: Missing required field "${field}"`)
        isValid = false
        break
      }
    }

    if (!isValid) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(row.email)) {
      errors.push(`Row ${rowNumber}: Invalid email format "${row.email}"`)
      return
    }

    const phoneDigits = row.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      errors.push(`Row ${rowNumber}: Phone must be 10 digits (got ${phoneDigits.length})`)
      return
    }

    try {
      const dateObj = new Date(row.dob)
      if (isNaN(dateObj.getTime())) {
        errors.push(`Row ${rowNumber}: Invalid date format for DOB`)
        return
      }
      if (dateObj > new Date()) {
        errors.push(`Row ${rowNumber}: DOB cannot be in the future`)
        return
      }
    } catch (e) {
      errors.push(`Row ${rowNumber}: Invalid date format for DOB`)
      return
    }

    const validRoles = ['unit_officer', 'field_officer', 'Unit Officer', 'Field Officer']
    const normalizedRole = row.role.toLowerCase().replace(/\s+/g, '_')
    let processedRole = 'unit_officer'
    
    if (normalizedRole.includes('field')) {
      processedRole = 'field_officer'
    }

    const specialisation = processedRole === 'field_officer' 
      ? (row.specialisation?.trim() || 'N/A')
      : 'N/A'

    const processedOfficer = {
      fullName: row.fullName.trim(),
      email: row.email.trim().toLowerCase(),
      phone: phoneDigits.substring(0, 10),
      dob: row.dob,
      state: row.state.trim(),
      city: row.city.trim(),
      region: row.region.trim(),
      district: row.district.trim(),
      department: row.department.trim(),
      specialisation,
      role: processedRole,
      password: row.password?.trim() || generatePassword(row.fullName, row.dob)
    }

    const emailExists = validOfficers.some(o => o.email === processedOfficer.email)
    if (emailExists) {
      warnings.push(`Row ${rowNumber}: Duplicate email "${processedOfficer.email}" - skipping`)
      return
    }

    validOfficers.push(processedOfficer)
  })

  console.log(`\n✅ Valid Officers: ${validOfficers.length}`)
  if (errors.length > 0) {
    console.log(`\n❌ Errors (${errors.length}):`)
    errors.forEach(e => console.log(`   ${e}`))
  }
  if (warnings.length > 0) {
    console.log(`\n⚠️ Warnings (${warnings.length}):`)
    warnings.forEach(w => console.log(`   ${w}`))
  }

  return validOfficers
}
