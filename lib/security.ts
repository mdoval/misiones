import bcrypt from 'bcryptjs'


export async function passCompare(password: string | null, passwordHashed: string | null) {
    if(!password || !passwordHashed) return false
    const res = bcrypt.compare(password,passwordHashed)
    return res
}

export async function passHash(password: string ) {
    const saltRounds = 10;
    const res = bcrypt.hash(password, saltRounds)
    return res    
}
