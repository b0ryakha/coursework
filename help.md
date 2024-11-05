инсталлируем пакеты `pg`, `pg-hstore`, `dotenv`, `sequelize`

`pg, pg-hstore` - драйверы БД

`sequelize` - ORM для запросов к бд
`dotenv` - чтобы хранить переменные окружения


в `index.js` файлике подключим их

```js
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server listen on port = ${PORT}`))
	} catch (e) {
		console.log(e)
	
```

start()

в файле `db.js` опишем подключение к БД

```js
const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		dialect: 'postgres',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	}
)
```

тут все берется из переменных окружения


В файле `models.js` опишем наши Entity БД

```js
const sequelize = require('../db')
const { DataTypes, EmptyResultError, DATE } = require('sequelize')

const Employee = sequelize.define('employee', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstname: { type: DataTypes.STRING, allowNull: false },
	lastname: { type: DataTypes.STRING, allowNull: false },
	patronimyc: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	phoneNumber: { type: DataTypes.STRING, allowNull: false },
}, {
	timestamps: false,
	freezeTableName: true
})

const Parent = sequelize.define('parents', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstname: { type: DataTypes.STRING, allowNull: false },
	lastname: { type: DataTypes.STRING, allowNull: false },
	patronimyc: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	phoneNumber: { type: DataTypes.STRING, allowNull: false },
	confirmed: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const Child = sequelize.define('child', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstname: { type: DataTypes.STRING, allowNull: false },
	lastname: { type: DataTypes.STRING, allowNull: false },
	patronimyc: { type: DataTypes.STRING },
}, {
	timestamps: false,
	freezeTableName: true
})

const EmployeeRole = sequelize.define('employee_role', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	role_name: { type: DataTypes.STRING, allowNull: false },
}, {
	timestamps: false,
	freezeTableName: true
})

const MedicalData = sequelize.define('medical_data', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING }
}, {
	timestamps: false,
	freezeTableName: true
})

const DiseaseTypes = sequelize.define('disease_types', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const Shift = sequelize.define('shift', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	dateStart: { type: DataTypes.DATE, allowNull: false },
	dateFinish: { type: DataTypes.DATE, allowNull: false },
	registrationOpen: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const ChildShift = sequelize.define('child_shift', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	confirmed: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
});

Child.belongsToMany(Shift, { through: ChildShift });
Shift.belongsToMany(Child, { through: ChildShift });

const Squad = sequelize.define('squad', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.INTEGER, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const MedicalAppeal = sequelize.define('medical_appeal', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	anamnesis: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING },
	carried_out: { type: DataTypes.STRING, allowNull: false },
	date: { type: DataTypes.DATE, allowNull: false }
}, {
	timestamps: false,
	freezeTableName: true
})

const SquadChild = sequelize.define('squad_child', {})
const SquadEmployee = sequelize.define('squad_employee', {})

MedicalAppeal.belongsTo(Child, { foreign_key: 'child_id' })

Shift.hasMany(Squad, { foreignKey: 'shift_id' })
Squad.belongsTo(Shift, { foreignKey: 'shift_id' })

Child.belongsToMany(Squad, { through: SquadChild })
Squad.belongsToMany(Child, { through: SquadChild })

Squad.belongsToMany(Employee, { through: SquadEmployee })
Employee.belongsToMany(Squad, { through: SquadEmployee })

MedicalData.belongsTo(Child, { foreignKey: 'child_id' })

DiseaseTypes.hasMany(MedicalData, { foreignKey: 'disease_id' })
MedicalData.belongsTo(DiseaseTypes, { foreignKey: 'disease_id' })

Child.belongsTo(Parent, { foreignKey: 'parent_id' })

EmployeeRole.hasMany(Employee, { foreignKey: 'role_id' })
Employee.belongsTo(EmployeeRole, { foreignKey: 'role_id' })

module.exports = {
	Parent,
	Employee,
	EmployeeRole,
	MedicalAppeal,
	MedicalData,
	DiseaseTypes,
	Child,
	Shift,
	Squad,
	SquadChild,
	SquadEmployee,
	ChildShift,
	sequelize
}
```

использовать в репозитории модель можно вот так:

```js
await MedicalAppeal.create({
				anamnesis,
				description,
				carried_out,
				date: new Date(),
				childId
			})
```

### JWT

`npm install jsonwebtoken`


тут проверяем - есть ли токен в запросе
```js
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(401).json({ message: "Не авторизован" })
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		req.user = decoded
		next()
	} catch (e) {
		res.status(401).json({ message: "Не авторизован" })
	}
};
```


тут по идее все нужно декомпозировать в сервисы, но это типа контроллер
```js
class UserController {
	// url:/signup/
	async registration(req, res, next) {
		try {
			const { firstname, lastname, patronimyc, phoneNumber, email, password } = req.body

			if (!email || !password || !firstname || !lastname || !phoneNumber) {
				return next(APIErrors.badRequest('Введены не все данные'))
			}

			const candidate = await Parent.findOne({ where: { email } })
			if (candidate) {
				return next(APIErrors.badRequest('Пользователь с таким email уже существует'))
			}

			const hashPassword = await bcrypt.hash(password, 5)
			const user = await Parent.create({
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: hashPassword,
				phoneNumber: phoneNumber,
				patronimyc: patronimyc,
				confirmed: false
			})
			const token = generateJwt(user.id, user.email, user.role_id !== undefined ? user.role_id : null)
			return res.json({ token })
		} catch (error) {
			return next(APIErrors.internalQuery("Ошибка при работе с БД"))
		}
	}
```


функция создания токена:
```js
const generateJwt = (id, email, role_id) => {
	return jwt.sign(
		{ id, email, role_id },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' }
	)
}
```
это роут:
```js
router.get('/', authMiddleware, ShiftController.create)
```

тут у нас в authMiddleware мы проверяем токен пользователя перед тем как выполнить контроллер, который слушает этот эндпоинт