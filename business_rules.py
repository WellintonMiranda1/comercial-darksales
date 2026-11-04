"""Regras financeiras puras do Comercial DarkSales — testáveis sem Flask/Neon."""
from datetime import date, timedelta
import calendar
from decimal import Decimal, ROUND_HALF_UP


def contract_total(monthly_cents: int, months: int) -> int:
    return monthly_cents * months


def commission_amount(monthly_cents: int, months: int, rate: float) -> int:
    value = Decimal(monthly_cents * months) * Decimal(str(rate))
    return int(value.quantize(Decimal('1'), rounding=ROUND_HALF_UP))


def add_months(iso: str, months: int) -> str:
    d=date.fromisoformat(iso)
    month_index=d.month - 1 + months
    y=d.year+month_index//12
    m=month_index%12+1
    return date(y,m,min(d.day,calendar.monthrange(y,m)[1])).isoformat()


def next_cycle(iso: str, cycle: str) -> str:
    if cycle == 'monthly':
        return (date.fromisoformat(iso)+timedelta(days=30)).isoformat()
    if cycle == 'semiannual':return add_months(iso,6)
    if cycle == 'annual':return add_months(iso,12)
    raise ValueError('Periodicidade inválida')


def projected_renewal(next_due_iso: str, cycle: str, month_start: str, month_end: str):
    """First cycle due in [month_start, month_end); supports overdue renewals."""
    due=date.fromisoformat(next_due_iso)
    start=date.fromisoformat(month_start)
    end=date.fromisoformat(month_end)
    for _ in range(300):
        if due >= end:return None
        if due >= start:return due.isoformat()
        due=date.fromisoformat(next_cycle(due.isoformat(),cycle))
    return None


def is_paid_active(payments_exist: bool, requested_status: str) -> bool:
    return payments_exist and requested_status == 'active'
