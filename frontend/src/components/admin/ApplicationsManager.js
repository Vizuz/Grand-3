import React, { useState } from 'react';
import {
  Eye,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  X,
  RotateCcw
} from 'lucide-react';
// NOTE: файл DataContext лежит в src/context, а этот компонент — в src/components/admin
// Поэтому поднимаемся на два уровня вверх.
import { useData } from '../../context/DataContext';

export default function ApplicationsManager() {
  const {
    applications = [],
    refreshApplications = () => {},
    updateApplicationStatus = () => {},
    deleteApplication: removeAppFromStore = () => {}
  } = useData();

  const [selectedApp, setSelectedApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusConfig = {
    new: { label: 'Новая', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    in_progress: { label: 'В работе', color: 'bg-blue-100 text-blue-800', icon: MessageCircle },
    completed: { label: 'Завершена', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  };

  const updateStatus = (id, newStatus) => updateApplicationStatus(id, newStatus);
  const deleteApplication = (id) => window.confirm('Удалить заявку?') && removeAppFromStore(id);

  const filtered = filterStatus === 'all' ? applications : applications.filter((a) => a.status === filterStatus);

  const stats = {
    total: applications.length,
    new: applications.filter((a) => a.status === 'new').length,
    in_progress: applications.filter((a) => a.status === 'in_progress').length,
    completed: applications.filter((a) => a.status === 'completed').length
  };

  return (
    <div className="space-y-6 p-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Заявки клиентов</h2>
        <div className="flex items-center space-x-4">
          <button onClick={refreshApplications} className="flex items-center bg-gray-200 px-3 py-1 rounded hover:bg-gray-300" title="Обновить с сервера">
            <RotateCcw className="w-4 h-4 mr-1" /> Обновить
          </button>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded px-3 py-1">
            <option value="all">Все</option>
            <option value="new">Новые</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Завершённые</option>
          </select>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Всего" value={stats.total} />
        <StatCard label="Новые" value={stats.new} Icon={Clock} color="yellow" />
        <StatCard label="В работе" value={stats.in_progress} Icon={MessageCircle} color="blue" />
        <StatCard label="Завершённые" value={stats.completed} Icon={CheckCircle} color="green" />
      </div>

      {/* table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <Th>Клиент</Th>
              <Th>Объект</Th>
              <Th>Дата</Th>
              <Th>Статус</Th>
              <Th>Действия</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((a) => {
              const Icon = statusConfig[a.status]?.icon || Clock;
              return (
                <tr key={a.id || a._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium text-gray-900">{a.name}</div>
                    <div className="text-gray-500 flex items-center text-xs"><Phone className="w-3 h-3 mr-1" />{a.phone}</div>
                    {a.email && <div className="text-gray-500 flex items-center text-xs"><Mail className="w-3 h-3 mr-1" />{a.email}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {a.projectName}
                    {a.apartmentNumber && <span className="text-gray-500"> • №{a.apartmentNumber}</span>}
                    <div className="text-xs text-gray-400">{a.source}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(a.timestamp || a.date).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[a.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                      <Icon className="w-3 h-3 mr-1" /> {statusConfig[a.status]?.label || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <ActionButton title="Просмотреть" Icon={Eye} onClick={() => setSelectedApp(a)} />
                      {a.status === 'new' && (
                        <ActionButton title="В работу" color="yellow" Icon={MessageCircle} onClick={() => updateStatus(a.id || a._id, 'in_progress')} />
                      )}
                      {a.status === 'in_progress' && (
                        <ActionButton title="Завершить" color="green" Icon={CheckCircle} onClick={() => updateStatus(a.id || a._id, 'completed')} />
                      )}
                      <ActionButton title="Удалить" color="red" Icon={X} onClick={() => deleteApplication(a.id || a._id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Нет заявок</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {selectedApp && (
        <Modal onClose={() => setSelectedApp(null)}>
          <ModalContent app={selectedApp} onChangeStatus={updateStatus} onDelete={deleteApplication} />
        </Modal>
      )}
    </div>
  );
}

/* helpers */
const Th = ({ children }) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;

const StatCard = ({ label, value, Icon, color = 'gray' }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center">
    {Icon ? <Icon className={`w-8 h-8 text-${color}-500 mr-3`} /> : <div className={`w-8 h-8 bg-${color}-500 text-white rounded flex items-center justify-center mr-3`}>{value}</div>}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const ActionButton = ({ title, onClick, Icon, color = 'blue' }) => (
  <button className={`text-${color}-600 hover:text-${color}-900`} onClick={onClick} title={title}>
    <Icon className="w-4 h-4" />
  </button>
);

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={onClose}><X className="w-6 h-6" /></button>
        {children}
      </div>
    </div>
  );
}

function ModalContent({ app, onChangeStatus, onDelete }) {
  const statusActions = {
    new: { next: 'in_progress', label: 'Взять в работу', color: 'blue' },
    in_progress: { next: 'completed', label: 'Завершить', color: 'green' }
  };
  const action = statusActions[app.status];
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Заявка #{app.id || app._id}</h3>
      <InfoRow label="Имя" value={app.name} />
      <InfoRow label="Телефон" value={app.phone} />
      {app.email && <InfoRow label="Email" value={app.email} />}
      <InfoRow label="Дата" value={new Date(app.timestamp || app.date).toLocaleString()} />
      <InfoRow label="Проект" value={`${app.projectName}${app.apartmentNumber ? ` • №${app.apartmentNumber}` : ''}`} />
      <InfoRow label="Сообщение" value={app.message} pre />
      <InfoRow label="Источник" value={app.source} />
      <div className="flex space-x-3 pt-4">
        {action && <button className={`bg-${action.color}-500 hover:bg-${action.color}-600 text-white px-4 py-2 rounded`} onClick={() => onChangeStatus(app.id || app._id, action.next)}>{action.label}</button>}
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => onDelete(app.id || app._id)}>Удалить</button>
      </div>
    </div>
  );
}

const InfoRow = ({ label, value, pre }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {pre ? <pre className="bg-gray-50 p-3 rounded whitespace-pre-wrap break-words">{value}</pre> : <p className="break-words">{value}</p>}
  </div>
);
