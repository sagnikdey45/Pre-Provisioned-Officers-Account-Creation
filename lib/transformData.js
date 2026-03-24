export const transformOfficerData = (officers = []) => {
  const users = []
  const unitOfficers = []
  const fieldOfficers = []

  officers.forEach(officer => {
    const user = {
      email: officer.email,
      password: officer.password,
      name: officer.fullName,
      role: officer.role === 'field_officer' ? 'FIELD_OFFICER' : 'UNIT_OFFICER',
      createdAt: new Date().toISOString(),
    }

    users.push(user)

    if (officer.role === 'unit_officer') {
      unitOfficers.push({
        userId: officer.email,
        fullName: officer.fullName,
        email: officer.email,
        phone: officer.phone,
        dob: officer.dob,
        state: officer.state,
        city: officer.city,
        region: officer.region,
        district: officer.district,
        department: officer.department,
      })
    } else if (officer.role === 'field_officer') {
      fieldOfficers.push({
        userId: officer.email,
        fullName: officer.fullName,
        email: officer.email,
        phone: officer.phone,
        dob: officer.dob,
        state: officer.state,
        city: officer.city,
        region: officer.region,
        district: officer.district,
        department: officer.department,
        specialisation: officer.specialisation || 'N/A',
      })
    }
  })

  return {
    users,
    unitOfficers,
    fieldOfficers,
    timestamp: new Date().toISOString(),
  }
}
