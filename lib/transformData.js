export const transformOfficerData = (officers = []) => {
  const users = []
  const unitOfficers = []
  const fieldOfficers = []

  officers.forEach(officer => {
    const user = {
      email: officer.email,
      password: officer.password,
      name: officer.fullName,
      role: officer.role === 'field_officer' ? 'field_officer' : 'unit_officer',
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

export const transformCityAdminData = (admins = []) => {
  const users = []
  const cityAdmins = []

  admins.forEach(admin => {
    // Create user object
    const user = {
      email: admin.email,
      password: admin.password,
      name: admin.fullName,
      role: "admin",
      createdAt: new Date().toISOString(),
    }

    users.push(user)

    // Create city admin object
    cityAdmins.push({
      userId: admin.email,
      fullName: admin.fullName,
      email: admin.email,
      phone: admin.phone,
      dob: admin.dob,
      state: admin.state,
      city: admin.city,
      district: admin.district,
    })
  })

  return {
    users,
    cityAdmins,
    timestamp: new Date().toISOString(),
  }
}
